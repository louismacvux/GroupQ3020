import GoalTable from "./GoalTable";
import Card from "../../layouts/Card";

const ManageGoals = (props) => {
     let { trackingData } = props;
     let { goals } = trackingData;
     return (
          <Card className="flex flex-col gap-6" title="Goals">
               <GoalTable goals={goals} />
               {/* <Button colorScheme="teal" variant="solid">
                    Edit Goals
               </Button> */}
          </Card>
     )
}

export default ManageGoals;