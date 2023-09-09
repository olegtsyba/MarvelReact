import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component{


    state = {
        char:{},
        loading:true,
        error:false
    }

    marvelService = new MarvelService();// Создаем новое свойство в классе с доступом ко всем свойствам и методам 



    componentDidMount() {
        this.updataChar()
        //this.cheack()
  /*    this.timerId = setInterval(this.updataChar,3000) */
    }

    componentWillUnmount() {
      /*   clearInterval(this.timerId) */
    }

    onCharLoaded =(char)=>{
        this.setState({
            char:char,
            loading:false
        })
    }

    onError =()=>{
        this.setState({
            loading:false,
            error:true
        })
    }


    updataChar = () =>{ // метод Обращаеися к серверу и меняет стате  
        //const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000);

        this.marvelService // Обращаемся к классу чтобы получить доступип к его методами 
        .getAllCharacters()
        .then(this.onCharLoaded) //
        .catch(this.onError)
        .then(this.getCharacter)
    }




    

    render(){

        //const {char: { description, thumbnail, homepage, wiki}} = this.state;

        const a = this.state.char
        console.log(Array.isArray(a));
/* 
      a.forEach(item =>{
            console.log(item.name);
        })  */

        


        
//console.log(a)



        return (
            <div className="char__list">
                <ul className="char__grid">
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">{}</div>
                    </li>
{/*      <li className="char__item char__item_selected">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                    <li className="char__item">
                    <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )

    }

}

export default CharList;