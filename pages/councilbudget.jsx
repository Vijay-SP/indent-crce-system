import { useState } from 'react';
import pocketbase from 'pocketbase';

const BudgetForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = pocketbase.firestore();
      const currentUser = pocketbase.auth().currentUser;
      const newEvent = {
        eventName,
        eventDate,
        budgetAmount,
        description,
        status: 'Pending',
        userId: currentUser.uid,
      };
      await db.collection('events').add(newEvent);
      alert('Budget approval request sent!');
    } catch (error) {
      console.error(error);
      alert('Error submitting request');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Request Budget Approval</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap mb-6">
          <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">
            Event Name:
          </label>
          <input
            type="text"
            name="eventName"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4"
            required
          />
        </div>
        <div className="flex flex-wrap mb-6">
          <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">
            Event Date:
          </label>
          <input
            type="date"
            name="eventDate"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4"
            required
          />
        </div>
        <div className="flex flex-wrap mb-6">
          <label htmlFor="budgetAmount" className="block text-gray-700 font-bold mb-2">
            Budget Amount:
          </label>
          <input
            type="number"
            name="budgetAmount"
            id="budgetAmount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4"
            required
          />
        </div>
        <div className="flex flex-wrap mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
