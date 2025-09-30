import React from "react";

export default function OverlayLoading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]' data-testid="overlay-loading">
      <div className='w-8 h-8 border-4 border-gray-200 border-t-[#3a4aef] rounded-full animate-spin'></div>
    </div>
  )
}
