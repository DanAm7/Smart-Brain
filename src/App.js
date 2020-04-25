import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
import Register from './components/Register';
import Rank from './components/Rank';
import SignIn from './components/SignIn';
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
      
  }
}
const anotherstate = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
}
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState( {user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputimg');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
      fetch('https://ancient-savannah-78817.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
              })   
            })
           .then(response => response.json())
           .then(response => {
             if (response) {
               fetch('https://ancient-savannah-78817.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
               })   
             })
                  .then(response => response.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, { entries: count }))
                  })
            }
             this.displayFaceBox(this.calculateFaceLocation(response))
           })
               .catch(err => console.log(err));
      }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(anotherstate)
    } else if (route === 'home') {
      this.setState({ isSignIn: true})
    }
    this.setState({ route: route });
  }

  render() {
  return (
    <div className="App">
        <Particles
          className='particles' 
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} />
        {this.state.route === 'home' 
        ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onSubmit={this.onSubmit}
                onInputChange={this.onInputChange}
              />
              <FaceRecognition
                box={this.state.box}
                imgUrl={this.state.imgUrl}
              />
          </div> 
          : (this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> )
        }
    </div>
  );
}
}

export default App;
