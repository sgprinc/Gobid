pragma solidity ^0.5.0;

contract Bidding {
    string public name;
    string public biddingEntity;
    uint public contractCount = 0;
    mapping(uint => Contract) public contracts;

    struct Contract {
        uint contractId;
        string contractTitle;
        string contractType;
        string contractLocation;
        string contractBudget;
        string contractStart;
        string contractEnd;
        bool assigned;
        address contractCompany;
    }

    event ContractCreated(
        uint contractId,
        string contractTitle,
        string contractType,
        string contractLocation,
        string contractBudget,
        string contractStart,
        string contractEnd,
        bool assigned,
        address contractCompany
    );

    event ContractAssigned(
        uint contractId,
        string contractTitle,
        string contractType,
        string contractLocation,
        string contractBudget,
        string contractStart,
        string contractEnd,
        bool assigned,
        address contractCompany
    );

    constructor () public{
        name = "Gobid Bidding Platform";
        biddingEntity = "Test Government";
    }

    // Add a new contract to the blockchain.
    function createContract (string memory _title, string memory _type, string memory _location,
     string memory _budget, string memory _start, string memory _end, bool _assigned) public{
        contractCount ++;
        contracts[contractCount] = Contract(contractCount, _title, _type, _location, _budget, _start, _end, _assigned, address(0));
        emit ContractCreated(contractCount, _title, _type, _location, _budget, _start, _end, _assigned, address(0));
    }

    function assignContract (uint contractId, address _company) public{
        Contract memory _contract = contracts[contractId];
        require(_contract.contractId > 0 && _contract.contractId <= contractCount, "Invalid contract number");
        require(!_contract.assigned, "Contact has already been assigned");
        _contract.contractCompany = _company;
        _contract.assigned = true;
        contracts[contractId] = _contract;
        emit ContractAssigned(contractCount, _contract.contractTitle, _contract.contractType, _contract.contractLocation,
         _contract.contractBudget, _contract.contractStart, _contract.contractEnd, _contract.assigned, _contract.contractCompany);
    }
}