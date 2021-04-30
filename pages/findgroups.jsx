import Head from 'next/head'
import GroupFind from '../components/groupFind'
import fetcher from '../lib/fetchJson'



export default function about() {
  return (
    <div>
      <Head>
        <title>Find groups</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inconsolata" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      </div>

      <center><img src="images/SiteNews.jpg" style={{ opacity: '0.9', width: '100%', maxHeight: '1200px' }} className="w3-margin-top" /></center>
      <div className="w3-display-middle w3-center" style={{ width: '50%', height: '85%', Padding: '30px' }}>
        <span className="w3-text-white w3-display-container" style={{ fontSize: '100px', padding: '10px' }}>Find Groups<br /></span>

        <div className="w3-middle-align" style={{ maxWidth: '800px', maxHeight: '80%', overflow: 'hidden', overflow: 'auto', background: "rgba(46, 49, 49, 0.75)" }}>
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
          <GroupFind />
        </div>
      </div>
      <style jsx>{`
            body {
              font-family: Arial;
            }
            
            * {
              box-sizing: border-box;
            }
            
            form.example input[type=text] {
              padding: 10px;
              font-size: 17px;
              border: 1px solid grey;
              float: left;
              width: 80%;
              background: #f1f1f1;
            }
            
            form.example button {
              float: left;
              width: 20%;
              padding: 10px;
              background: #202020;
              color: white;
              font-size: 17px;
              border: 1px solid grey;
              border-left: none;
              cursor: pointer;
            }
            
            form.example button:hover {
              background: #808080;
            }
            
            form.example::after {
              content: "";
              clear: both;
              display: table;
            }
          `}</style>
      <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
    
            * {
              box-sizing: border-box;
            }
          `}</style>
    </div>
  );
}

export async function getServerSideProps({ req }) {

  const cook = req.cookies.session
  const userData = await fetcher('http://localhost:3000/api/get-userdata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cook,
    }),
  })

  if (userData.message === 'no session available') {
    return {
      props: { reroute: true }
    }
  }


  return {
    props: {
      userID: userData.userID,
      nameOfUser: userData.userInfo[0].username,
      description: userData.userInfo[0].description,
      userGames: userData.userGames
    }, // will be passed to the page component as props
  }
}

