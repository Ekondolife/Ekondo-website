import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, firstName, experienceName, listId } = await request.json();

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY not set");
    }

    const apiKey = process.env.BREVO_API_KEY;

    // Step 1: Check if list exists, create if it doesn't
    let finalListId = listId;

    if (!listId) {
      // Search for existing list by name
      const searchResponse = await fetch("https://api.brevo.com/v3/contacts/lists", {
        method: "GET",
        headers: {
          "api-key": apiKey,
        },
      });

      const searchData = await searchResponse.json();
      const existingList = searchData.lists?.find((list: any) => 
        list.name.toLowerCase() === experienceName.toLowerCase()
      );

      if (existingList) {
        finalListId = existingList.id;
      } else {
        // Create new list
        const createListResponse = await fetch("https://api.brevo.com/v3/contacts/lists", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: experienceName,
            folderId: 1, // Default folder
          }),
        });

        const createData = await createListResponse.json();
        if (!createListResponse.ok) {
          throw new Error(createData.message || "Failed to create list");
        }
        finalListId = createData.id;
      }
    }

    // Step 2: Add/update contact in the list
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName,
        attributes: {
          EXPERIENCE_NAME: experienceName,
        },
        listIds: finalListId ? [finalListId] : [],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      // If contact already exists, update it to add to list
      if (data.code === "duplicate_parameter") {
        // Update existing contact to add to list
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listIds: finalListId ? [finalListId] : [],
            attributes: {
              EXPERIENCE_NAME: experienceName,
            },
          }),
        });
        
        if (!updateResponse.ok) {
          throw new Error("Failed to update contact in Brevo");
        }
      } else {
        throw new Error(data.message || "Brevo API failed");
      }
    }

    return NextResponse.json({ ok: true, data, listId: finalListId });
  } catch (error: any) {
    console.error("💥 Brevo API error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

