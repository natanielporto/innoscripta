import { CombinedNewsProps } from "../../globalState/interfaces";

const Card = (props: CombinedNewsProps) => {
  const handleRedirectToSource = (url: string) => {
    window.open(url, '_blank');
  }

  const formatDate = (date: string) => {
    if (date.includes("T")) {
      return new Date(date.split("T")[0]).toLocaleDateString()
    }
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className={`w-[300px] h-[300px] border-2 flex flex-col items-center justify-center rounded-md ${props.source === "New York Times" && 'bg-blue-50'} ${props?.webUrl?.split(".")[1] && 'bg-green-50'}`} >
      <div className='text-2xl text-center mb-4 p-2 cursor-pointer' onClick={() => handleRedirectToSource(props.url || props.webUrl)}>{props.title || props.webTitle}</div>
      <div className="text-center">By: {props?.author || props?.byline?.split(' ')[1] || "-"}</div>
      <div>From: {props?.source?.name || props?.source || (props.webUrl.includes("theguardian") && "The Guardian")}</div>
      <div>{formatDate(props?.publishedAt?.split("T")[0] || props?.published_date || props?.webPublicationDate?.split("T")[0])}</div>
    </div>

  )
}

export default Card

