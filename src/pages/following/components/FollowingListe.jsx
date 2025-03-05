import { Fragment } from "react";
import { CgProfile } from "react-icons/cg";

const FollowingsList = ({ follow }) => {
    return (
        <Fragment>
            <div
                key={follow.id}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700"
                onClick={() => handleProfileClick(follow.followedId)}
            >
                <div className="flex items-center">
                    <CgProfile className="w-10 h-10 text-white mr-4" />
                    <span className="text-white">{follow.email}</span>
                </div>
            </div>
        </Fragment>
    )
}

export default FollowingsList;
