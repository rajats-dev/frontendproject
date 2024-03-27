import { useRouter } from "next/router";
import React, { useState } from "react";

const list = () => {
  const [idx, setIdx] = useState<number[]>([]);
  const router = useRouter();
  const { data } = router.query;
  const dataString = data as string;
  const dataArray = dataString ? JSON.parse(dataString) : [];

  const onAddIdx = (i: number) => {
    if (idx.includes(i)) {
      let newIdx = idx.filter((el) => el !== i);
      setIdx(newIdx);
    } else {
      setIdx((prev) => [...prev, i]);
    }
  };

  const onConvertToJSONL = () => {
    const filterdata = idx.map((item) => dataArray[item]);
    console.log(filterdata);
    if (filterdata) {
      const jsonlData = filterdata
        .map((item) => JSON.stringify(item))
        .join("\n");
      const blob = new Blob([jsonlData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "filteredData.jsonl";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onConvertToJSONL}
        className="bg-red-700 p-2 rounded text-cyan-50"
      >
        Download JSONL File
      </button>
      {dataArray.map((item: any, i: number) => (
        <div
          className="flex border-2 border-solid border-black w-fit justify-start"
          key={i}
        >
          <ul className="border-4 p-3">
            <li>{item.question}</li>
            <li>{item.answer}</li>
          </ul>
          <input
            type="checkbox"
            checked={idx.includes(i)}
            onChange={() => onAddIdx(i)}
            className="m-5"
          />
        </div>
      ))}
    </div>
  );
};

export default list;
