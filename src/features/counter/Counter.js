import { useSelector,useDispatch } from "react-redux";
import { increment,decrement } from "./counterSlice";


function Counter() {

    const count=useSelector((state)=>state.counter.count);
    const dispatch=useDispatch();
  return (
    <section>
        <div>{count}</div>
        <div><button onClick={()=>dispatch(increment())}>+</button></div>
        <div><button onClick={dispatch(decrement())}>-</button></div>
    </section>
    
  )
}

export default Counter