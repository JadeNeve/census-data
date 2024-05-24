import React, { useState, useEffect } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import FilterBySelectionModal from '../../components/Modals/FilterBySelectionModal';

const Search = () => {
  const [userData, setUserData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://census-87ed1-default-rtdb.firebaseio.com/1bi9vDH32ROhsu7tjCF1TRSOct9BN9lUXkiCO2d47h38/Sheet1.json');
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = {};
    Object.keys(userData).forEach(location => {
      // Check if userData[location] is an array before filtering
      if (Array.isArray(userData[location])) {
        const filteredUsers = userData[location].filter(user =>
          user.Surname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredUsers.length > 0) {
          filtered[location] = filteredUsers;
        }
      }
    });
    setFilteredData(filtered);
  }, [userData, searchTerm]);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (e, user) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems([...selectedItems, user]);
    } else {
      setSelectedItems(selectedItems.filter(item => item.IDNO !== user.IDNO));
    }
  };

  const totalSelected = selectedItems.length;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 10);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Data List</h1>
      <p>Total Selected: {totalSelected}</p>
      <SearchInput onChange={handleSearchChange} />
      <button onClick={handleOpenModal} disabled={totalSelected === 0} variant="outlined">Edit Members</button>

      {Object.keys(filteredData).map(location => (
        <div key={location}>
          <ul>
            {filteredData[location].slice(0, visibleItems).map(user => (
              <li key={user.IDNO}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(user)}
                  onChange={(e) => handleCheckboxChange(e, user)}
                />
                <div>Surname: {user.Surname}</div>
                <div>Gender: {user.Gender}</div>
                <div>Age: {user.Age}</div>
                <div>CenGroup: {user.CenGroup}</div>
                <div>UID: {user.famidno}</div>
                <div>prstAdminSortName: {user.prstAdminSortName}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {visibleItems < Object.values(filteredData).flat().length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      <FilterBySelectionModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        selectedItems={selectedItems}
      />
    </div>
  );
};

export default Search;
