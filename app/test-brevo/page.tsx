"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/components/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function TestBrevoPage() {
  const { email, displayName, uid } = useUser();
  const { toast } = useToast();
  const [testEmail, setTestEmail] = useState(email || "");
  const [experienceName, setExperienceName] = useState("Test Experience");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!testEmail || !experienceName) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and experience name.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          firstName: displayName || "Test User",
          experienceName,
          listId: null, // Will create list dynamically
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.ok) {
        toast({
          title: "Success!",
          description: `Added to Brevo list: ${data.listId || "New list created"}`,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add to Brevo",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setResult({ ok: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTestSpecificList = async (listId: number) => {
    if (!testEmail || !experienceName) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and experience name.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          firstName: displayName || "Test User",
          experienceName: "Southside Festival",
          listId, // Use specific list ID
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.ok) {
        toast({
          title: "Success!",
          description: `Added to Brevo list ID: ${listId}`,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add to Brevo",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setResult({ ok: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8">Test Brevo Integration</h1>

        <Card className="border-none shadow-lg  mb-6">
          <CardHeader>
            <CardTitle>Test Adding Contact to Brevo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1 "
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience Name (List Name)</Label>
              <Input
                id="experience"
                type="text"
                value={experienceName}
                onChange={(e) => setExperienceName(e.target.value)}
                placeholder="Test Experience"
                className="mt-1 "
              />
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleTest}
                disabled={isProcessing}
                className="w-full  btn-gradient"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Test Dynamic List Creation"
                )}
              </Button>

              <Button
                onClick={() => handleTestSpecificList(15)}
                disabled={isProcessing}
                variant="outline"
                className="w-full  bg-transparent"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Test Southside Festival (List ID: 15)"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`border-none shadow-lg  ${result.ok ? "bg-green-50" : "bg-red-50"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.ok ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Success!
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    Error
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card className="border-none shadow-md organic-shape mt-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Enter your email address</p>
            <p>2. Enter an experience name (this will be the Brevo list name)</p>
            <p>3. Click "Test Dynamic List Creation" to create a new list or add to existing</p>
            <p>4. Or click "Test Southside Festival" to test with the specific list ID 15</p>
            <p>5. Check your Brevo account to verify the contact was added</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

