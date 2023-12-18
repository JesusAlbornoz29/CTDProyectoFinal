/* eslint react/prop-types: */

const TeamCard = (props) => {
  return (
    <div className="tooltip text-left" data-tip={props.tooltip}>
      <div className="card w-56 h-52 hover:bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{props.name}</h2>
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={props.pic} />
            </div>
          </div>
          <p>{props.role}</p>
        </div>
      </div>
    </div>
  );
};
export default TeamCard;
