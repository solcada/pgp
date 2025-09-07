"use client";

import Image from "next/image";
import { ComboboxDemo } from "@/components/ui/combobox"
import { SimpleCombobox } from "@/components/ui/simple-combobox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Combo } from "next/font/google";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "wordpress", label: "WordPress" },
  { value: "express.js", label: "Express.js" },
];



export default function Home() {
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Pick your medicine</h2>
          {/* <SimpleCombobox 
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select framework..."
            searchPlaceholder="Search medicine..."
            emptyText="No framework found."
          /> */}

          <ComboboxDemo
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select framework..."
            searchPlaceholder="Search framework..."
            emptyText="No framework found."
          />

          {/* <ComboboxDemo
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select framework..."
            searchPlaceholder="Search framework..."
            emptyText="No framework found."
          /> */}

          {/* center the button  */}
          <Button className="mt-4">
            Submit
          </Button>

          {/* <div className="mt-4 p-2 bg-gray-100 rounded">
            <p>Selected: {selectedFramework || "Nothing selected"}</p>
          </div> */}
  
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Public Good Pharma
      </footer>
    </div>
  );
}
