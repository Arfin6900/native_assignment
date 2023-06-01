import { getUser } from '../../api/fakeApiUser'
import { PLACES_HISTORY_CREATED } from '../constants'



export const Fetch_places_history=(data)=>{
  console.log('========================action',data)
  return{
    type:PLACES_HISTORY_CREATED,
    payload:data
  }
}


// export const fetchDataUser = () => async dispatch => {
//   try {
//     dispatch(fetchUserRequest())
//     const { data } = await getUser()
//     dispatch(fetchUserSuccess(data))
//   } catch (error) {
//     dispatch(fetchUserFail())
//   }
// }