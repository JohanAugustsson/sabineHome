import React, { Component } from 'react';
import { saveCakeToDb,saveFileToDb,updateNewCake } from '../../actions/cakeActions';
import { connect } from 'react-redux';
import AvatarImage from '../image/AvatarImage';
import './CreateCake.css';




class CreateCake extends Component {
  constructor(props){
    super(props);
    this.state = {
      mainImgList: [],
      howToCookImgList: [],
      end:"",
      ingridientName: "",
      ingridientAmount:"",
      title:"",
      main:"",
      newCake: this.props.newCake ? this.props.newCake : {},
      howToCookStr: '',
    }
  }

  handelSave = () =>{
    const { dispatch } = this.props;
    console.log('spara!');
    const obj = {
      description: {
        content: ['fösrta content','andra content','tredje content'],
        end: { text: 'här ska de va slut' }
      },
      howtocook: [
        {
          description: 'sätt ugenen på 333 grader'
        },
        {
          description: 'brän bullarna'
        }
      ],
      ingridience: {
        kanel: '2msk',
        socker: '1msk'
      }
    }
    dispatch(saveCakeToDb(obj));

  }



  apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    const { dispatch } = this.props;

    dispatch(saveFileToDb(file)).then( (a)=> {
      this.setState({
        mainPictureUrl: a.payload
      })
    });

    //var src = window.URL.createObjectURL(file);
    //console.log(file);
  }

  handleSaveCake = () => {
    const { dispatch } = this.props;
    console.log(this.state.newCake);
    dispatch(saveCakeToDb(this.state.newCake));
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value  })
  }

  handleInputRoot = (e) => {
    this.setState({ [e.target.name]: e.target.value  })
  }

  handleInputIngredients = (e) => {
    this.setState({ ingredient: { ...this.state.ingredient, [e.target.name]: e.target.value } });
  }

  handleInputHowToCook = (e) => {
    this.setState({ howToCookStr: e.target.value });
  }
  handleInputEnd = (e) => {
    this.setState({ end: e.target.value });
  }

  handleAddHowToCook = () => {
    const { dispatch } = this.props;
    const { newCake, howToCookImgList, howToCookStr } = this.state;
    const data = Object.values(howToCookImgList)



    newCake.howToCook =  newCake.howToCook ?
        [ ...newCake.howToCook, {img: {...data}, str: howToCookStr} ]
      :
        [   {str:howToCookStr , img: { ...data}} ]

    this.setState({newCake}, ()=>{
      dispatch(updateNewCake(newCake));
    })
  }

  handleAddIngridience = () => {
    const { dispatch } = this.props;
    const { newCake, ingridientName, ingridientAmount} = this.state
    newCake.ingredients =  newCake.ingredients ?
        [ ...newCake.ingredients,  { ingridientName, ingridientAmount } ]
      :
        [  { ingridientName, ingridientAmount } ]

    this.setState({newCake}, ()=>{
      dispatch(updateNewCake(newCake));
    })
  }

  loadIngridience = (ingredients) => {
    return ingredients.map( (item, index) =>
      (
        <div className='ingredientData' key={index}>
          <input value={item.ingridientAmount}></input>
          <input value={item.ingridientName}></input>
          <button onClick={()=> this.removeFromList("ingredients",index)}>ta bort</button>

        </div>
      )
    );
  }

  loadHowToCook = (steps) => {
    return steps.map( (step, index) => {
      console.log(step);
      const text = step.str; // text description of current step
      const imgList = Object.values(step.img); // list with image of current step

      const showImg = imgList.map( (img,ind)  => (
          <li key={ind}>
            <img src={ img } height='100%' width='100%' alt="how to cook"/>
          </li>
      ));

      return (
        <div key={index}>
          <p>{text}</p>
          <ul className='stepsImgUl'> {showImg } </ul>
          <button onClick={()=> this.removeFromList("howToCook",index)}>ta bort</button>

        </div>
      )
    })
  }

  removeFromList = (list,itemNb) => {
    const listToReduce  = this.state.newCake[list];
    const data = listToReduce.filter((item,index) =>{
      if(index!==itemNb)
        return item
      return null;
    })
    this.setState({ newCake: { ...this.state.newCake ,  [list]: data } })
  }

  setImageInNewCake = (imgUrl, path) => {
    console.log(imgUrl,path);
    const { howToCookImgList } = this.state

    if(path === 'main') {
      this.setState({ newCake: { ...this.state.newCake ,  main: {img: imgUrl, title: this.state.title, description: this.state.description } } })
    }
    if(path === 'endImg') {
      this.setState({ newCake: { ...this.state.newCake ,  end: {img: imgUrl, text: this.state.end } } })
    }

    if(path === 'howToCookImg') {
      howToCookImgList.push(imgUrl);
      this.setState({howToCookImgList})
    }
  }

  removeCurrentImage = indexToRemove => {
    const { howToCookImgList } = this.state;
    const newImgList = howToCookImgList.filter( ( img, index) => index !== indexToRemove );
    this.setState({howToCookImgList: newImgList })
  }

  currentImages = (images) => {
    const newList = images.map( (img,index) => {
      return (
        <div key={index}>
          <img alt="select one" src={ img } height='250px' width='280px' onClick={ ()=> this.removeCurrentImage(index) }/>
        </div>
      )
    })
    return (<ul style={{display: 'flex'}}>{ newList }</ul>)
  }

  addEndText = () =>{
    const data = this.state.newCake.end || {};
    data.text= this.state.end;
    this.setState({ newCake: { ...this.state.newCake ,  end: data } })
  }

  addMain = () =>{
    const data = this.state.newCake.main || {};
    data.title= this.state.title;
    data.description= this.state.description;
    this.setState({ newCake: { ...this.state.newCake ,  main: data } })
  }
  addContent = () =>{
    this.setState({ newCake: { ...this.state.newCake ,  content: this.state.content } })
  }


  render(){
    const { newCake, howToCookImgList } = this.state;
    const ingredients = newCake && newCake.ingredients && newCake.ingredients.length > 0 ?  this.loadIngridience(newCake.ingredients ) : '';
    const howToCook = newCake && newCake.howToCook && newCake.howToCook.length > 0 ? this.loadHowToCook(newCake.howToCook): '';
    const currentImages = howToCookImgList && howToCookImgList.length > 0 ? this.currentImages(howToCookImgList) : [];

    return(
      <div className='container-CreateCake'>

        <div className='main'>
          <AvatarImage size={{height:'400px',width:'450px', margin: 'auto'}} path='main' setImageInNewCake={ this.setImageInNewCake } />
          <div className='text'>
            <label>Titel <input type='text' name='title' value={ this.state.title } onChange={this.handleInputRoot} /></label>
            <label>Beskrivning <textarea cols='40' row='15' name='description' value={ this.state.description } onChange={this.handleInputRoot} /></label>
          </div>
            <button onClick={this.addMain}>Lägg till</button>
        </div>

        <div className='ingridience'>
          <label>Ingridienser <input name='ingridientAmount' value={this.state.ingridientAmount} onChange={this.handleInputRoot} type='text'/></label>
          <label> -<input name='ingridientName' value={this.state.ingridientName} onChange={this.handleInputRoot} type='text' /></label>
          <button onClick={ this.handleAddIngridience }>Lägg till</button>
          { ingredients }
        </div>

        <div className='howToCook'>
          <div className='add'>
            <label htmlFor='howToCookTitle' >Så här gör du: </label>
            <textarea id='howToCookTitle' name='howToCookStr' onChange={ this.handleInputHowToCook } type='text' />
            { currentImages }
          </div>
          <div className='cookImg'>
            <AvatarImage size={{height:'250px',width:'250px', margin: 'auto'}} path='howToCookImg' setImageInNewCake={ this.setImageInNewCake } />
          </div>
          <button onClick={ this.handleAddHowToCook }>Lägg till</button>
        </div>

        <div className='stepByStep'>
          { howToCook }
        </div>

        <div className='content'>
          <label>Content <textarea cols='80' row='30' name='content' value={this.state.content} onChange={this.handleInputRoot} /></label>
          <button onClick={this.addContent}>Lägg till</button>
        </div>

        <div className='main'>
          <AvatarImage size={{height:'300px',width:'400px', margin: 'auto'}} path='endImg' setImageInNewCake={ this.setImageInNewCake } />
          <div className='text'>
            <label>Slut text <textarea cols='40' row='15' name='end' value={ this.state.end } onChange={this.handleInputRoot} /></label>
          </div>
          <button onClick={this.addEndText}>Lägg till</button>
        </div>


        <button onClick={ this.handleSaveCake }> save cake to store </button>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  newCake: state.cakes.newCake
})



export default connect(mapStateToProps)(CreateCake);
