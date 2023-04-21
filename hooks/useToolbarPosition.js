import { useEffect, useState } from "react";

const useToolbarPosition = (selection) => {
  const [toolbarPosition, setToolbarPosition] = useState(null);
  useEffect(() => {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const position = {
      top: window.scrollY + rect.top - 44,
      left: window.screenX + rect.left,
    };
    setToolbarPosition(position);
  });
  return toolbarPosition;
};

export default useToolbarPosition;
