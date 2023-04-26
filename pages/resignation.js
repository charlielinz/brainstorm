import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Emailform from "@/components/Emailform";
import Toolbar from "@/components/Toolbar";
import { resignationFormDatas } from "@/statics/resignationFormDatas";
import { decode } from "@/utils/Decode";

library.add(faMessage);

const Resignation = ({ formFieldDatas }) => {
  const [formDatas, setFormDatas] = useState(formFieldDatas);
  const [isFormValid, setIsFormValid] = useState(false);
  // const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState([]);

  const [selectedText, setSelectedText] = useState(null);
  const [toolbarPosition, setToolbarPosition] = useState(null);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const position = {
        top: window.scrollY + rect.top - 44,
        left: window.screenX + rect.left,
      };
      setSelectedText(selectedText);
      setToolbarPosition(position);
    } else {
      setSelectedText(null);
      setToolbarPosition(null);
    }
  };
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto my-12">
      <div className="bg-gradient-to-br from-gray-300 to-gray-700 rounded transition-colors">
        <Emailform
          resignationFormDatas={resignationFormDatas}
          formDatas={formDatas}
          setFormDatas={setFormDatas}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          setResults={setResults}
        />
      </div>
      <div className="mt-12 mx-2" onMouseUp={handleMouseUp}>
        {results}
        {selectedText && <Toolbar toolbarPosition={toolbarPosition} />}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const formFieldDatas = resignationFormDatas;
  return {
    props: { formFieldDatas },
  };
};

export default Resignation;
