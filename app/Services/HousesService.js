import { ProxyState } from "../AppState.js"
import House from "../Models/House.js"
import {api} from "./AxiosService.js"

class HousesService {
 
 async getHouses() {
    let res  = await api.get("houses")
    console.log(res.data)
    ProxyState.houses = res.data.map(c=> new House(c))
  }

  async createHouse(newHouse) {
    let house = await api.post("houses", newHouse)
    console.log(house);

    this.getHouses();
  }


  async deleteHouse(id) {
    let res  = await api.delete("houses/"+id)
    console.log(res)

    ProxyState.houses = ProxyState.houses.filter(house => house.id != id)

    // this.getCars()

  }

   async getOne(id){
     //typically you would take in an id from your controller and pass that onto your api
    let res = await api.get("houses/"+id)
    console.log(res)
  }
}

//GET
//URL/api/collection

//GETBYID
//URL/api/collection/someId

//PUT
//URL/api/collection/someId, whatWeAreEditing

//POST
//URL/api/collection , whatWeArePosting

//DELETE
//URL/api/collection/someId
//api.delete(id)



// Singleton Pattern
export const housesService = new HousesService()