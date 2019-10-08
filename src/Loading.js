import React from 'react';
import {Layout} from 'antd';
import logo from './assets/gtr.png';
import getir from './assets/bimutluluk.png';
import loadingImage from './assets/loadingimage.gif';
const { Header, Content, Footer } = Layout;

class Loading extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Header style={{textAlign:'center',position:'fixed', left:'0', height:'70px', width:'100%',backgroundColor:'#5D3EBD'}}>

                    <div id="logo">
                        <img src={logo} alt="Logo" />
                    </div>


                </Header>
                <Content style={{ position:'absolute', top:'70px',bottom:'70px',width:'100%',overflow:'auto'}}>
                    <div align="center" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <img width="200" height="200" src={getir}/><br/>
                        <img src={loadingImage}/>
                    </div>
                </Content>
                <Footer style={{backgroundColor:'#5D3EBD', position:'fixed', left:'0', height:'70px', width:'100%', bottom:'0', top:'auto', textAlign: 'center',fontSize:'20px' }}><text style={{color:'white'}}>Ozan Aydın</text></Footer>
            </Layout>
        );
    }
}

export default Loading;
