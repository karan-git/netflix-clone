import React from "react";

interface DescriptionSectionProps {
  description: string;
}

export function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <div className="bg-zinc-900 p-8 rounded-xl border border-neutral-800">
      <h3 className="text-neutral-400 mb-2">Description</h3>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
}
