import ProfileSection from "../features/user/ProfileSection";
import useTitle from "../hooks/useTitle";

function Profile() {
  useTitle("Profile | Flow - SPA and Fitness");

  return (
    <>
      <ProfileSection />
    </>
  );
}

export default Profile;
