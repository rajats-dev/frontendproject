import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [textInput, setTextInput] = useState<string>("");
  const [res, setResponseData] = useState([]);

  const onSubmitHandle = () => {
    const ApiCalling = async () => {
      try {
        const data = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textInput),
        });
        const response = await data.json();
        const res = response.questions;
        setResponseData(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (textInput) {
      ApiCalling();
    } else {
      alert("Please enter some text");
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="font-bold">Question-Answer Tool</h1>
      <textarea
        rows={10}
        cols={50}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter your text here..."
        className="border-2 border-solid"
      ></textarea>
      <div>
        <button
          className="bg-red-600 w-fit text-fuchsia-50 rounded-md m-3 p-2 hover:bg-red-800"
          onClick={onSubmitHandle}
        >
          Submit
        </button>
        {res.length ? (
          <Link
            href={{
              pathname: "/list",
              query: { data: JSON.stringify(res) },
            }}
            className="bg-green-600 w-fit text-fuchsia-50 rounded-md m-4 p-2 hover:bg-green-800"
          >
            View Result
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
