import AuthForm from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background leaf-pattern">
      <div className="container px-4 py-16">
        <div className="flex justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

// This page will automatically use app/login/layout.tsx as its
