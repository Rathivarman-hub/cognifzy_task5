const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-img" />
    <div className="p-3">
      <div className="skeleton skeleton-text" style={{ width: '40%' }} />
      <div className="skeleton skeleton-text" style={{ width: '90%' }} />
      <div className="skeleton skeleton-text" style={{ width: '75%' }} />
      <div className="skeleton skeleton-text-sm" />
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="skeleton" style={{ width: '60px', height: '24px' }} />
        <div className="skeleton" style={{ width: '100px', height: '32px', borderRadius: '8px' }} />
      </div>
    </div>
  </div>
);

const Loader = ({ count = 6 }) => {
  return (
    <div className="row g-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-12 col-sm-6 col-lg-4">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};

export default Loader;
