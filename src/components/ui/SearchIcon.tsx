
import { Search } from 'lucide-react';

const SearchIcon = ({ className }: { className?: string }) => {
  return <Search className={className || "h-4 w-4"} />;
};

export default SearchIcon;
