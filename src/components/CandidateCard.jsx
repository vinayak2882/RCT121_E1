import styles from "./CandidateCard.module.css";

function CandidateCard({
  avatar: url,
  name,
  company_name:title,
  salary
}) {



  return (
    <div data-testid="candidate-container" className={styles.container}>
      <img alt="logo" width="100px" height="100px" src={url} />
      <div>
        <div>Name : {name}</div>
        <div>{title}</div>  
       
      </div>
      <div> $ {salary}</div>
    </div>
  );
}

export default CandidateCard;
