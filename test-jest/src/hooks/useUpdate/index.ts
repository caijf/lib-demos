import { useCallback, useState } from 'react';

function useUpdate() {
  const [, update] = useState(0);
  return useCallback(() => {
    update(x => x + 1);
  }, []);
}

export default useUpdate;
