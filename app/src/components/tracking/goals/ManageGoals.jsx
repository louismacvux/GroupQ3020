import { useState } from "react";
import GoalTable from "./GoalTable";
import CardTitle from "../../layouts/Card/CardTitle";
import { HiCheck, HiPencil } from "react-icons/hi";

const ManageGoals = (props) => {
     let { trackingData } = props;
     let { goals } = trackingData;

     const [isEditing, setIsEditing] = useState(false);

     let rightIcon = isEditing ?
          (
               <HiCheck className="cursor-pointer" onClick={() => setIsEditing(false)} />
          ) :
          (
               <HiPencil className="cursor-pointer" onClick={() => setIsEditing(true)} />
          )

     return (
          <div>
               <CardTitle rightIcon={rightIcon}>Goals</CardTitle>
               <GoalTable goals={goals} title="Goals" isEditing={isEditing} />
          </div>
     )
}

export default ManageGoals;
