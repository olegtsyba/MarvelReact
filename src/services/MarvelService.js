

   class MarvelService {

      _apiBase = 'https://gateway.marvel.com:443/v1/public/';
      _apiKey = 'apikey=b99ea5f460c68929f9ff4baec562a60b';

   getResourse = async (url)=> {
      let res =  await fetch(url);//

      if(!res.ok){
         throw new Error(`Could not fetch ${url}, status ${res.status}`)
      }
      return await res.json()
   }

   getAllCharacters =async()=>{
      const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
      return res.data.results.map(this._transformCharacter)
   }

   getCharacter = async (id)=>{
      const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformCharacter(res.data.results[0]);
   }


   _transformCharacterr = (res) =>{

      return {
         name:res.data.result[0].name,
         discription:res.data.result[0].discription,
         thumbnail:res.data.result[0].thumbnail.patch + '.' + res.data.result[0].thumbnail.extension ,//Формируем путь из двух значений объекта ,
         homepage:res.data.result[0].urls[0].url,
         wiki:res.data.result[0].urls[1].url,
   }

   }

   _transformCharacter = (char) =>{

      return {
         name:char.name,
         description:char.description ? `${char.description.slice(0,250)+ '......'}` :'Character has no description',
         thumbnail:char.thumbnail.path + '.' +char.thumbnail.extension,
         homepage:char.urls[0].url,
         wiki:char.urls[1].url
      }

   }

} 


export default MarvelService;