import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <section>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div onClick={() => dispatch(reset())}>to zero</div>
      <div>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          Increment By 5
        </button>
      </div>
    </section>
  );
}

export default Counter;
