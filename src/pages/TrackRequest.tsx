import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Package, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ContainerRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  container_type: string;
  quantity: number;
  status: 'pending' | 'approved' | 'delivered' | 'rejected';
  notes?: string;
}

const statusSteps = [
  { status: 'pending', icon: Clock, label: 'Request Pending' },
  { status: 'approved', icon: CheckCircle, label: 'Request Approved' },
  { status: 'delivered', icon: Truck, label: 'Containers Delivered' }
];

const TrackRequest = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ContainerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('container_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setRequest(data);
    } catch (err) {
      setError('Request not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ContainerRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'approved': return 'text-green-500';
      case 'delivered': return 'text-blue-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p>Loading request details...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Request Not Found</h2>
        <p className="text-gray-600">The request you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const currentStep = request.status === 'rejected' ? -1 : 
    statusSteps.findIndex(step => step.status === request.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-8">Container Request Status</h1>

        {request.status === 'rejected' ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <XCircle className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Request Rejected</h2>
            </div>
            <p className="text-gray-600">
              Unfortunately, your container request has been rejected. Please contact our support team for more information.
            </p>
          </div>
        ) : (
          <div className="relative mb-8">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div key={step.status} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center relative bg-white border-2 ${
                        isCompleted
                          ? 'border-green-500 text-green-500'
                          : 'border-gray-300 text-gray-300'
                      } ${isCurrent ? 'ring-4 ring-green-50' : ''}`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-600">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Request Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Request ID</span>
                <p className="font-mono">{request.id}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Date Submitted</span>
                <p>{format(new Date(request.created_at), 'PPP')}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status</span>
                <p className={`font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Container Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Container Type</span>
                <p>{request.container_type}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Quantity</span>
                <p>{request.quantity}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Delivery Address</span>
                <p>{request.address}</p>
              </div>
            </div>
          </div>
        </div>

        {request.notes && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Additional Notes</h3>
            <p className="text-gray-600">{request.notes}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-4">Need Help?</h3>
          <p className="text-gray-600">
            If you have any questions about your container request, please contact our support team:
          </p>
          <div className="mt-2">
            <a href="tel:0800727727" className="text-purple-800 hover:text-purple-900">
              0800 SCRAP (72727)
            </a>
            <span className="mx-2">•</span>
            <a href="mailto:support@scrapper.co.za" className="text-purple-800 hover:text-purple-900">
              support@scrapper.co.za
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRequest;