import React,{useState} from 'react';

class Home extends React.component {
  state = {
    isLoading : true,
    datas : []
  };

  getInfo = async () => {
    const datas = await axios.get("");
  }
  commponentDidMount() {
    this.getInfo();
  }
  render() {
    const {isLoading} = this.state;
    return(
      <div class="main">
            <div class='main serch'>
              <input type='text' placeholder='시설 이름 입력' class='main serch input'onChange={setSearchCenter} />
              <button class='main search btn' onClick={}>검색</button>
            </div>

            <div class="main info">
              
            </div>
      </div>
    );
  }
}

export default Home;