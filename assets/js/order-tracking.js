/**
 * FRESHBASKET SUPERMARKET - ORDER TRACKING ENGINE
 * Animated delivery stepper, real-time step progression demo & delivery map placeholder
 */

const ORDER_STAGES = ['Confirmed', 'Packing', 'Out for Delivery', 'Delivered'];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('order-tracking-container')) {
    initOrderTracking();
  }
});

function initOrderTracking() {
  const lastOrder = JSON.parse(localStorage.getItem('fb_last_order') || 'null');
  
  const displayOrder = lastOrder || {
    orderId: 'FB-847291',
    date: 'Today, 2:30 PM',
    deliverySlot: 'Today, 6:00 PM - 8:00 PM',
    status: 'Packing',
    items: [
      { name: 'Fresh Organic Bananas', quantity: 2, price: 49 },
      { name: 'Farm Fresh Toned Milk', quantity: 1, price: 62 },
      { name: 'Whole Wheat Bread', quantity: 1, price: 45 }
    ],
    grandTotal: 205
  };

  renderTrackingDetails(displayOrder);
  initSimulationController(displayOrder);
}

function renderTrackingDetails(order) {
  const idEl = document.getElementById('tracking-order-id');
  const slotEl = document.getElementById('tracking-slot');
  const statusBadge = document.getElementById('tracking-status-badge');

  if (idEl) idEl.textContent = order.orderId;
  if (slotEl) slotEl.textContent = order.deliverySlot;
  if (statusBadge) statusBadge.textContent = order.status;

  updateStepperUI(order.status);
}

function updateStepperUI(status) {
  const currentIndex = ORDER_STAGES.indexOf(status) !== -1 ? ORDER_STAGES.indexOf(status) : 1;
  const progressLine = document.getElementById('stepper-progress-bar');
  const steps = document.querySelectorAll('.stepper-item');

  if (progressLine) {
    const percentage = (currentIndex / (ORDER_STAGES.length - 1)) * 100;
    progressLine.style.width = `${percentage}%`;
  }

  steps.forEach((step, idx) => {
    if (idx < currentIndex) {
      step.className = 'stepper-item completed';
    } else if (idx === currentIndex) {
      step.className = 'stepper-item active';
    } else {
      step.className = 'stepper-item';
    }
  });
}

function initSimulationController(order) {
  const simBtn = document.getElementById('advance-order-step-btn');
  if (!simBtn) return;

  simBtn.addEventListener('click', () => {
    let currentIdx = ORDER_STAGES.indexOf(order.status);
    if (currentIdx < ORDER_STAGES.length - 1) {
      currentIdx++;
      order.status = ORDER_STAGES[currentIdx];
      localStorage.setItem('fb_last_order', JSON.stringify(order));
      renderTrackingDetails(order);
      showToast(`Order status updated to: ${order.status}`, 'info');
    } else {
      showToast('Order has already been delivered!', 'success');
    }
  });
}
