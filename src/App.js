import React, { useState } from 'react';
import './App.css';
import { Predictions } from 'aws-amplify';
//import { WithAuthenticator } from 'aws-amplify-react';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(config)

function App() {
  const [res, setRes] = useState("Please upload a image......")
  async function identify(event){
    setRes("Identifying text....")
    const { target: {files} } = event
    const file = files[0]
    const data = await Predictions.identify({
      text: { source: { file }, format: "PLAIN"}
    })

    setRes(data.text.fullText)
    console.log(setRes)
  }
  return (
    <div className="App">
      <h3>Text Identification</h3>
      <input type="file" onChange={identify} />
      <p>{res}</p>
    </div>
  );
}

export default withAuthenticator(App, true);
