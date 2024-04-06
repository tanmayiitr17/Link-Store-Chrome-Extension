import { useState, useEffect } from 'react';
// import axios from 'axios';

// Declare chrome as a global variable
declare global {
  interface Window {
    chrome: any;
  }
}

interface Tab {
  url: string;
}

const App = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [myLinks, setMyLinks] = useState<string[]>([]);
  // const [shortenedLink, setShortenedLink] = useState<string>("")

  useEffect(() => {
    const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks") || "[]") as string[];
    if (linksFromLocalStorage) {
      setMyLinks(linksFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
  }, [myLinks]);

  // const fetchData = async (myLinks: any): Promise<string> => {
  //   try {
  //     const response = await axios(
  //       `https://api.shrtco.de/v2/shorten?url=${myLinks}`
  //     );
  //     setShortenedLink(response.data.result.full_short_link);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     return shortenedLink;
  //   }
  // };

  const handleSaveInput = () => {
    setMyLinks([...myLinks, inputValue]);
    setInputValue('');
  };

  const handleSaveTab = () => {
    window.chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: Tab[]) {
      setMyLinks([...myLinks, tabs[0].url]);
    });
  };

  const handleDeleteAll = () => {
    localStorage.clear();
    setMyLinks([]);
  };

  return (
    <div className="flex flex-col min-w-[400px] p-[10px] m-0">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-[2px] border-solid border-[#5f9341] box-border w-[100%] p-[10px] mb-[4px]"
        placeholder="Enter text"
      />
      <div className="flex gap-[10px]">
        <button
          onClick={handleSaveInput}
          className="bg-[#5f9341] text-white font-bold py-[10px] px-[20px] border-[1px] border-solid border-[#5f9341]"
        >
          SAVE INPUT
        </button>
        <button
          onClick={handleSaveTab}
          className="bg-[#5f9341] text-white font-bold py-[10px] px-[20px] border-[1px] border-solid border-[#5f9341]"
        >
          SAVE TAB
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-white text-[#5f9341] font-bold py-[10px] px-[20px] border-[1px] border-solid border-[#5f9341]"
        >
          DELETE ALL
        </button>
      </div>
      <ul className="list-none mt-[2px] pl-0 w-[100%]">
        {myLinks.map((link, index) => (
          <li key={index} className="mt-2">
            <a href={link} target='_blank' className="text-green-600">{link}</a>
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default App;
