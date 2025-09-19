import {Spinner,useLoading} from "../exporter/exporter"

function SpinnerContainer(){
  const {isLoading}=useLoading();
  return <>
     {isLoading && (
    <div className="fixed inset-0 flex justify-center items-center bg-[#0D0D0D] bg-opacity-50 z-50">
      <Spinner />
    </div>
  )}
  </>
}
export default SpinnerContainer;