import { useState } from "react";
import "./styles.css";


let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  
];

export default function App() {
  let [desc, setDesc] = useState("");
  let [list , setLists] = useState([...initialItems])
 
  return (
    <div className="App">
      <Header />
      <Form 
      list = {list}
        setLists ={setLists}
        setDesc = {setDesc}
        desc = {desc}
        />
      <PackingList 
      list ={list}/>
      <Stats />
    </div>
  );
}

function Header() {
  return <h1> 🏝 Far Away 🧳 </h1>;
}
function Form({ desc, setDesc, list, setLists }) {
  console.log(list);

  function AddInList(e) {
    e.preventDefault();
    let dictionary = {};
    dictionary.id = list.length + 1; // Use the length of the current 'list' state to calculate the new ID
    dictionary.description = desc;
    dictionary.quantity = Number(document.querySelector("select").value);
    dictionary.packed = false;
    setLists([...list, dictionary]); // Use 'list' instead of 'initialItems'
  }

  return (
    <form className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        {Array.from({ length: 20 }, (val, idx) => idx + 1).map((val, idx) => {
          return (
            <option key={idx} value={val}>
              {val}
            </option>
          );
        })}
      </select>

      <input
        placeholder="item..."
        value={desc}
        onChange={(e) => {
          console.log(e.target.value);
          setDesc(e.target.value);
        }}
      ></input>
      <button onClick={AddInList}>ADD</button>
    </form>
  );
}




function PackingList({list}) {
  return (
    <div className="list">
      <ul>
        {list.map((eItem) => {
          return <Item item={eItem} />;
        })}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
