// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthVault {
    struct Record {
        string fileHash; // The SHA-256 hash or IPFS CID
        string metadataHash; // IPFS CID of any off-chain JSON metadata
        uint256 timestamp;
        address uploader;
    }

    // Mapping from a patient's unique system ID (string) to an array of their Records
    mapping(string => Record[]) private patientRecords;

    event RecordAdded(
        string indexed patientId,
        string fileHash,
        uint256 timestamp,
        address uploader
    );

    /**
     * @dev Add a new immutable record for a patient.
     * @param _patientId The unique system ID of the patient (e.g. from MongoDB)
     * @param _fileHash The cryptographic hash of the document (or IPFS CID)
     * @param _metadataHash (Optional) IPFS CID for extra public metadata
     */
    function addRecord(
        string memory _patientId,
        string memory _fileHash,
        string memory _metadataHash
    ) public {
        Record memory newRecord = Record({
            fileHash: _fileHash,
            metadataHash: _metadataHash,
            timestamp: block.timestamp,
            uploader: msg.sender
        });

        patientRecords[_patientId].push(newRecord);

        emit RecordAdded(_patientId, _fileHash, block.timestamp, msg.sender);
    }

    /**
     * @dev Retrieve all records stored on-chain for a specific patient.
     * @param _patientId The unique system ID of the patient.
     */
    function getRecords(string memory _patientId) public view returns (Record[] memory) {
        return patientRecords[_patientId];
    }
}
