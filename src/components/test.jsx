import React from "react";

export default function Test() {
  return (
    <div class="h-screen flex flex-col">
      <div class="bg-slate-700 sticky top-0 h-16">Header</div>

      <div class="bg-red-600 flex-1 overflow-y-auto">Table</div>
    </div>
  );
}
