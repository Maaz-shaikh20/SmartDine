import sequelize from '../config/db';
import { Booking, Table } from '../models';

async function cleanInvalidTables() {
    console.log('--- Database Cleanup Started ---');
    try {
        // Find bookings with tableId assigned
        const bookingsWithTable = await Booking.findAll({
            where: {
                tableId: { [Symbol.for('ne')]: null }
            }
        });

        console.log(`Checking ${bookingsWithTable.length} bookings for valid table assignments...`);

        let fixCount = 0;
        for (const booking of bookingsWithTable) {
            if (booking.tableId) {
                const table = await Table.findByPk(booking.tableId);
                if (!table) {
                    console.log(`Fixing Booking #${booking.id}: Table ID ${booking.tableId} does not exist.`);
                    booking.tableId = null;
                    booking.tableNumber = null as any;
                    await booking.save();
                    fixCount++;
                }
            }
        }

        console.log(`--- Cleanup Finished: ${fixCount} bookings updated ---`);
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        // We don't exit process here if we are importing this, but as a script we should.
        // sequelize.close();
    }
}

// If run directly
if (require.main === module) {
    cleanInvalidTables().then(() => process.exit(0));
}

export default cleanInvalidTables;
