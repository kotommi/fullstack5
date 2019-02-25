import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  // ...

  useEffect(() => {
    axios.get(baseUrl).then(res => {
      setResources(res.data);
    });
  }, []);

  const create = async resource => {
    // ...
    try {
      const res = await axios.post(baseUrl, resource, {});
      setResources(resources.concat(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  const service = {
    create
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = event => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = event => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  const noteRows = () => {
    return notes ? notes.map(n => <p key={n.id}>{n.content}</p>) : <p />;
  };

  const personRows = () => {
    return persons ? (
      persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))
    ) : (
      <p />
    );
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {noteRows()}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {personRows()}
    </div>
  );
};

export default App;
