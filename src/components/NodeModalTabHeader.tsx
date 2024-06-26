import { Dispatch, FC, SetStateAction } from "react";

const NodeModalTabHeader: FC<{
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}> = ({ tab, setTab }) => {
  return (
    <div className="flex items-center">
      <div
        onClick={() => setTab(0)}
        className={`w-full text-center text-xs font-bold text-gray-300 p-2 border-b-2 border-gray-200 uppercase cursor-pointer ${
          tab === 0 && "text-black border-sky-400 bg-gray-100"
        }`}
      >
        Date senzori
      </div>
      <div
        onClick={() => setTab(1)}
        className={`w-full text-center text-xs font-bold text-gray-300 p-2 border-b-2 border-gray-200 uppercase cursor-pointer ${
          tab === 1 && "text-black border-sky-400 bg-gray-100"
        }`}
      >
        Interpretare IA
      </div>
    </div>
  );
};

export default NodeModalTabHeader;
