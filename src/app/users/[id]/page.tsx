const UserPage = ({ params }: { params: { id: string } }) => {
  return <div>User: {params.id}</div>;
};

export default UserPage;
