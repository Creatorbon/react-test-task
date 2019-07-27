const API_KEY = 'AIzaSyAShx8QLS_bc-cvTWKPfKdNLq6P79mDifc';
const TYPE = 'video';
const PART = 'snippet'

const getData = async (search) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=${PART}&q=${search}&type=${TYPE}&key=${API_KEY}`;
    const data = await fetch(url);
    return await data.json();
  };
  
  export default getData;
  