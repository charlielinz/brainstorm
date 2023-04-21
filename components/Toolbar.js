import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

library.add(faMessage);

const Toolbar = (toolbarPosition) => {
  console.log(toolbarPosition);
  return (
    <nav
      style={{
        top: `${toolbarPosition.top}px`,
        left: `${toolbarPosition.left}px`,
      }}
      className="absolute flex px-4 h-10 bg-zinc-700 rounded"
    >
      <button className="text-white text-2xl">
        <FontAwesomeIcon icon="fa-solid fa-message" />
      </button>
    </nav>
  );
};

export default Toolbar;
