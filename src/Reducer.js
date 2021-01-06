export const initialState = {
    search:null,
    currentMusic: null,
    music: "stopped",
    currentTime: null,
    duration: null,
    isLoading:false,
    user:null,
    isSign:false,
    fav:null,
    trackId:[]
};

function reducer(state,action){    
    //console.log(action);
    switch(action.type){

        case "SET_SEARCH":
            return{
                ...state,
                search:action.search
            }

        case "SET_CURRENT_MUSIC":
            return{
                ...state,
                currentMusic:action.currentMusic
            }
        
        case "SET_CURRENT_TIME":
            return{
                ...state,
                currentTime:action.currentTime
            }
        
        case "SET_MUSIC_STATE":
            return{
                ...state,
                music:action.music
            }
        
        case "SET_LOADING":
            return{
                ...state,
                isLoading:action.isLoading
            }

        case "SET_TRACKID":
            return{
                ...state,
                trackId:[...state.trackId,action.trackId]
            }
        
        case "REMOVE_TRACK_ID":
            let newCart = state.trackId;
            const index = state.trackId.includes(action.trackId)

            if(index){
                newCart.splice(index,1);
            }else{
                console.warn(`cant remove:${action.trackId}`);
            }
            return {
                ...state
            };

        case "ADD_TO_FAV":
            return{
                ...state,
                fav:action.fav
            }

        case "SET_CURRENT_USER":
                return{
                    ...state,
                    user:action.user,
                    isSign:action.isSign
            };
          
        default:
            return state;
    }
}

export default reducer;