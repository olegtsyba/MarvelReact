import { Component } from 'react';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMesage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
class RandomChar extends Component {



    /* state = {
        name:null,
        discription:null,
        thumbnail:null,
        homepage:null,
        wiki:null
    } */


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

  /*   updataChar = () =>{ // метод Обращаеися к серверу и меняет стате  
        const id = 1011005
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000); Получаем уникальный индификатор ,первый метода округляет до целого числа второй выдает рондомное значение из заданого диапазона

        this.marvelService // Обращаемся к классу чтобы получить доступип к его методами 
        .getCharacter(id)
        .then(res =>{    //Получаем ответ из фетча(сервера)  и с ним работаем 
            Модифмцируем  метода в отдельном файле экземляре в виде метода _transformCharacter,чтобы не дублировать в каждом экземпляре при работе со стейтом ,сюда возращаем  модифицированный объект  и помещаем его в стейт 

            this.setState(res)

            /*
            this.setState({
                state = {
                    name:res.data.result[0].name,
                    discription:res.data.result[0].discription,
                    thumbnail:res.data.result[0].thumbnail.patch + '.' + res.data.result[0].thumbnail.extension //Формируем путь из двух значений объекта ,
                    homepage:res.data.result[0].urls[0].url,
                    wiki:res.data.result[0].urls[1].url,
                }
            })
        }) //
        .catch(this.onError)
        .then(this.getCharacter)
    } */

    updataChar = () =>{ // метод Обращаеися к серверу и меняет стате  
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000);

        this.marvelService // Обращаемся к классу чтобы получить доступип к его методами 
        .getCharacter(id)
        .then(this.onCharLoaded) //
        .catch(this.onError)
        .then(this.getCharacter)
    }


    /*   cheack = () =>{
        const img =document.querySelector('.randomchar__decoration');
        const imgStyle =window.getComputedStyle(img);
        console.log(imgStyle);
    } */





    render() {

        //const {name,description,thumbnail,homepage,wiki} = this.state


        const {char,loading,error}  = this.state;
        const errorMessage = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(loading||error) ? <View char={char}/> : null
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updataChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


const View = ({char})=>{
    const {name,description,thumbnail,homepage,wiki}  = char;
    //console.log(name);
    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}.
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )

}

export default RandomChar;