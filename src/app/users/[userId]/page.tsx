const UserPage = ({ params }: { params: { userId: string } }) => {
  return <div>User: {params.userId}</div>;
};

export default UserPage;
