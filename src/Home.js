import React,{useState} from 'react';

function Home(props) {
  const [searchCenter,setSearchCenter] = useState('')
  return(
      <div class="main">
            <div class='main serch'>
              <input type='text' placeholder='시설 이름 입력' class='main serch input'onChange={setSearchCenter} />
              <button class='main search btn' />
            </div>
            <div class="main info">
              
            </div>
      </div>

  )
}

export default Home;