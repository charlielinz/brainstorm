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

  useEffect(() => {}, [formDatas]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults("");
    // setIsGenerating(true);
    if (!isFormValid) {
      alert();
    } else {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          position: formData.position,
          recipient: formData.recipient,
          date: formData.date,
          description: formData.description,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = response.body;
      if (!data) {
        return;
      }

      decode(data, setResults, setIsGenerating);

      const inputToUpdate = formDatas.find(
        (item) => Object.keys(item)[0] === key
      );
      inputToUpdate[key].value = "";
      setFormDatas(updatedFormDatas);
    }
  };

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
          formDatas={formDatas}
          setFormDatas={setFormDatas}
          isFormValid={isFormValid}
          handleSubmit={handleSubmit}
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
