import React,{useState} from 'react';

function Home(props) {
  const [searchCenter,setSearchCenter] = useState('')
  return(
      <div class="main">
            <div class='main_serch'>
              <input type='text' placeholder='시설 이름 입력' onChange={setSearchCenter}
            </div>
            <div class="main _info">

            </div>
      </div>

  )
}

export default Home;