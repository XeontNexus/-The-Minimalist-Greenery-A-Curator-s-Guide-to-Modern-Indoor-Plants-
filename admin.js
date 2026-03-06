// Admin Dashboard JavaScript
document.addEventListener('alpine:init', () => {
    Alpine.data('adminDashboard', () => ({
        activeSection: 'plants',
        showPlantForm: false,
        showOrderModal: false,
        editingPlant: null,
        selectedOrder: null,
        currentUser: null,
        plants: [],
        orders: [],
        comments: [],
        users: [],
        
        plantForm: {
            name: '',
            scientific: '',
            description: '',
            price: '',
            care: '',
            imageUrls: '',
            features: ['low-light', 'easy-care'],
            space: ['living', 'workspace']
        },

        init() {
            this.checkAuth();
            this.loadData();
        },

        async checkAuth() {
            const user = localStorage.getItem('minimalist-greenery-user');
            if (!user) {
                window.location.href = 'login.html';
                return;
            }

            const userData = JSON.parse(user);
            if (userData.role !== 'admin') {
                alert('Access denied. Admin only.');
                window.location.href = 'index.html';
                return;
            }

            this.currentUser = userData;
        },

        logout() {
            localStorage.removeItem('minimalist-greenery-user');
            window.location.href = 'index.html';
        },

        loadData() {
            this.loadPlants();
            this.loadOrders();
            this.loadComments();
            this.loadUsers();
        },

        loadPlants() {
            const saved = localStorage.getItem('minimalist-greenery-plants');
            if (saved) {
                this.plants = JSON.parse(saved);
            } else {
                // Default plants data
                this.plants = [
                    {
                        id: 1,
                        name: 'Sansevieria (Snake Plant)',
                        scientific: 'Sansevieria Trifasciata',
                        image: [
                            'https://images.unsplash.com/photo-1543076654-771d9a9ea1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            'https://images.unsplash.com/photo-1573165072025-ef8e7e28d5a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                        ],
                        description: 'Garis vertikal tegas yang sempurna untuk arsitektur modern',
                        care: 'Sangat mudah - hanya perlu disiram 10-14 hari sekali',
                        light: 'low',
                        features: ['low-light', 'easy-care', 'air-purifying'],
                        price: 'Rp 150.000',
                        space: ['bathroom', 'bedroom', 'living']
                    }
                ];
                this.savePlants();
            }
        },

        loadOrders() {
            const saved = localStorage.getItem('minimalist-greenery-orders');
            if (saved) {
                this.orders = JSON.parse(saved).map(order => ({
                    ...order,
                    id: order.timestamp || Date.now().toString(),
                    status: order.status || 'pending'
                }));
            }
        },

        loadComments() {
            const saved = localStorage.getItem('minimalist-greenery-comments');
            if (saved) {
                this.comments = JSON.parse(saved);
            }
        },

        loadUsers() {
            const saved = localStorage.getItem('minimalist-greenery-users');
            if (saved) {
                this.users = JSON.parse(saved);
            } else {
                // Add default admin
                this.users = [
                    {
                        id: 'admin-default',
                        email: 'admin@minimalistgreenery.com',
                        name: 'Admin',
                        role: 'admin',
                        createdAt: new Date().toISOString()
                    }
                ];
                this.saveUsers();
            }
        },

        savePlants() {
            localStorage.setItem('minimalist-greenery-plants', JSON.stringify(this.plants));
        },

        saveOrders() {
            localStorage.setItem('minimalist-greenery-orders', JSON.stringify(this.orders));
        },

        saveUsers() {
            localStorage.setItem('minimalist-greenery-users', JSON.stringify(this.users));
        },

        // Plant CRUD operations
        savePlant() {
            if (this.editingPlant) {
                // Update existing plant
                const index = this.plants.findIndex(p => p.id === this.editingPlant.id);
                if (index !== -1) {
                    this.plants[index] = {
                        ...this.plantForm,
                        id: this.editingPlant.id,
                        image: this.plantForm.imageUrls.split(',').map(url => url.trim()).filter(url => url),
                        features: this.plantForm.features || ['low-light'],
                        space: this.plantForm.space || ['living']
                    };
                }
            } else {
                // Add new plant
                const newPlant = {
                    ...this.plantForm,
                    id: Date.now().toString(),
                    image: this.plantForm.imageUrls.split(',').map(url => url.trim()).filter(url => url),
                    features: this.plantForm.features || ['low-light'],
                    space: this.plantForm.space || ['living']
                };
                this.plants.push(newPlant);
            }

            this.savePlants();
            this.cancelPlantEdit();
            this.showSuccessMessage('Tanaman berhasil disimpan!');
        },

        editPlant(plant) {
            this.editingPlant = plant;
            this.plantForm = {
                name: plant.name,
                scientific: plant.scientific,
                description: plant.description,
                price: plant.price,
                care: plant.care,
                imageUrls: Array.isArray(plant.image) ? plant.image.join(', ') : plant.image,
                features: plant.features || ['low-light'],
                space: plant.space || ['living']
            };
            this.showPlantForm = true;
        },

        deletePlant(plantId) {
            if (confirm('Apakah Anda yakin ingin menghapus tanaman ini?')) {
                this.plants = this.plants.filter(p => p.id !== plantId);
                this.savePlants();
                this.showSuccessMessage('Tanaman berhasil dihapus!');
            }
        },

        cancelPlantEdit() {
            this.showPlantForm = false;
            this.editingPlant = null;
            this.plantForm = {
                name: '',
                scientific: '',
                description: '',
                price: '',
                care: '',
                imageUrls: '',
                features: ['low-light'],
                space: ['living']
            };
        },

        // Order operations
        updateOrderStatus(orderId, newStatus) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                this.saveOrders();
                this.showSuccessMessage('Status pesanan berhasil diperbarui!');
            }
        },

        viewOrderDetails(order) {
            this.selectedOrder = order;
            this.showOrderModal = true;
        },

        // Comment operations
        deleteComment(commentId) {
            if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
                this.comments = this.comments.filter(c => c.id !== commentId);
                localStorage.setItem('minimalist-greenery-comments', JSON.stringify(this.comments));
                this.showSuccessMessage('Komentar berhasil dihapus!');
            }
        },

        // User operations
        toggleUserRole(userId) {
            const user = this.users.find(u => u.id === userId);
            if (user && user.email !== 'admin@minimalistgreenery.com') {
                user.role = user.role === 'admin' ? 'user' : 'admin';
                this.saveUsers();
                this.showSuccessMessage(`Role ${user.email} berhasil diubah menjadi ${user.role}!`);
            }
        },

        // Utility functions
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        showSuccessMessage(message) {
            // Create success message element
            const messageDiv = document.createElement('div');
            messageDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            messageDiv.textContent = message;
            document.body.appendChild(messageDiv);

            // Remove after 3 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }
    }));
});
